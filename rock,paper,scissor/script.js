const randomnumber = () => (Math.random()*10).toFixed(0)%3

const rock = document.querySelector('#rock')
const paper = document.querySelector('#paper')
const scissor = document.querySelector('#scissor')
const message = document.querySelector('.result')
const pscorebox = document.querySelector('.p1score')
const cscorebox = document.querySelector('.p2score')
const turns = document.querySelector('.turns')

let t = 0
let pscore = 0, cscore = 0

rock.addEventListener('click', () => game(0))
paper.addEventListener('click', () => game(1))
scissor.addEventListener('click', () => game(2))

const game = (option) => {
    computerrsponse = randomnumber()
    console.log(computerrsponse)
    switch(option){
        case 0:
            switch(computerrsponse){
                case 0:
                    message.innerHTML = 'draw'
                    break;
                case 1:
                    message.innerHTML = 'Paper cover rocks, you lose!'
                    cscore++
                    cscorebox.innerHTML = cscore
                    break;
                case 2:
                    message.innerHTML = 'Rock cover scissor, you win!'
                    pscore++
                    pscorebox.innerHTML = pscore
                    break;
            }
            break;
        case 1:
            switch(computerrsponse){
                case 0:
                    message.innerHTML = 'Paper cover rocks, you win!'
                    pscore++
                    pscorebox.innerHTML = pscore
                    break;
                case 1:
                    message.innerHTML = 'draw'
                    break;
                case 2:
                    message.innerHTML = 'Scissor cover paper, you lose!'
                    cscore++
                    cscorebox.innerHTML = cscore
                    break;
            }
            break;
        case 2:
            switch(computerrsponse){
                case 0:
                    message.innerHTML = 'Rock cover scissor, you lose!'
                    cscore++
                    cscorebox.innerHTML = cscore
                    break;
                case 1:
                    message.innerHTML = 'Scissor cover paper, you win!'
                    pscore++
                    pscorebox.innerHTML = pscore
                    break;
                case 2:
                    message.innerHTML = 'draw'
                    break;
            }
            break;
        default: break;
    }

    t++
    turns.innerHTML = t
}