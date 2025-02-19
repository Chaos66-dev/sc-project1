# SC-Project1

MVP is to be able to generate two random pokemon, one for the user, and one for the cpu. They should be rendered to the page and be able to battle each other without animations.

# How to run
1. Clone down this directory
```
git clone https://github.com/Chaos66-dev/sc-project1.git
```
2. Navigate to the project folder
```
cd sc-project1.git
```
3. Start an http server on your local machine
```
python3 -m http.server 8000
```
4. Navigate to localhost:8000 on your browser
```
http://localhost:8000/
```
3. Select the battle configurations you would like to use
4. Have fun!

# Game mechanics that are not implemented
1. There is a non-comprehensive list of blacklisted moves in the battle.js file as these moves are useless due to their individual effects not being implemented in this game.
2. All moves that involve inflicting burn, freeze, poison, and confusion are not implemented.
3. Items are not implemented and the button has no function
4. The player cannot switch pokemon as they like, pokemon only switch on faint
5. Damage is not calculated based on the nintendo formula. It is an estimation from my end on what feels like a reasonable damage calculation.
6. All moves that inflict a weather effect are not implemented

# Game mechanics that are implemented
1. Typing - Moves can be super effective/not very effective/have no effect based on the move and opponent type
2. Stat Changes - Moves can increase or decrease individual stats of pokemon
3. High/Low rolling dmg - There is a slight randomness to how much damage a move does (usually around +/- 3 dmg)
4. DMG - Damage calculation takes into account attacking and defending pokemon stats
5. Paralysis/Sleep - Paralysis and sleep are the only status' that are currently implemented


## Contact
Created by [Erik Voss](https://github.com/Chaos66-dev) - feel free to reach out!
