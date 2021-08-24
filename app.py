from boggle import Boggle
from flask import Flask, render_template, session, redirect, request, jsonify, flash
import logging
import flask

logging.basicConfig(level=logging.DEBUG)
boggle_game = Boggle()


app = Flask(__name__)
app.config['SECRET_KEY'] = 'iwalktheline'

game_state = 'init'
guess_list = []
def init_game():
    if game_state == 'init':
        board = session.get('board', boggle_game.make_board())
        session['board'] = board
        return board
 

@app.route('/game')
def homepage():
    board = init_game()
    return render_template('home.html', boggle=board)

@app.route('/game/guess')
def check_guess():
    board = session['board']
    guess = request.args.get('guess')
    if guess not in guess_list:
        if boggle_game.check_valid_word(board, guess) == 'ok':
            guess_list.append(guess)
            return {'result': 'ok'}
        else:
            return {'result': 'not on board'}
    else:
        return {'result': 'already selected'}



@app.route('/clear')
def clear():
    flask.session.clear()
    return redirect('/game')



app.logger.info('done')