
class animateMethods{
    constructor(squares, setSquares, addToast)
    {
        this.animationTrail = 10
        this.squares = squares
        this.setSquares = setSquares
        this.addToast = addToast
    }
    animateTrail = (tickIndex, tickArr) =>
    {
        this.squares[tickArr[tickIndex]] = 'maroon'
        if(tickIndex > this.animationTrail)
            this.squares[tickArr[tickIndex-this.animationTrail]] = 'green'
    }
    finishAnimationTrail = (current, tickArr, tickIndex) =>
    {
        this.squares[tickArr[tickIndex-current]] = 'green'
        current--
        this.setSquares(this.squares.slice())
        return current
    }
    animateWithoutReturnPath = (arr, startMarkerIndex, endMarkerIndex) => {
        let tickIndex = 1
        let current = this.animationTrail
        const timerID2 = setInterval(() => tick2(arr), 10)
        this.resetBoardOnAlgorithmRun(startMarkerIndex, endMarkerIndex)
        const tick2 = (tickArr) => {
            if (tickIndex < tickArr.length - 1) {
            //mutating the array directly :/
                this.animateTrail(tickIndex, tickArr)
                tickIndex++
                this.setSquares(this.squares.slice())
            } else {
                if (current > 0)
                    current = this.finishAnimationTrail(current, tickArr, tickIndex)
                else
                {
                    clearInterval(timerID2)
                    this.returnToast(tickArr)
                }
            }
        }
    }
    animateWithReturnPath = (arr, startMarkerIndex, endMarkerIndex) => {
        const findPathArr = arr[0]
        const shortestPathArr = arr[1]
        const timerID2 = setInterval(() => tick2(findPathArr, shortestPathArr), 10)
        let tickIndex = 0
        this.resetBoardOnAlgorithmRun(startMarkerIndex, endMarkerIndex)
        let finishedAnimatingFindPath = false
        const tick2 = (findPathArr, shortestPathArr) => {
            if (!finishedAnimatingFindPath) {
                if (tickIndex <= findPathArr.length) {
                    for (let i = 0; i < 4; i++) {
                        //mutating the array directly -- doesn't seem to update promptly otherwise
                        if (tickIndex <= findPathArr.length && findPathArr[tickIndex] !== endMarkerIndex && findPathArr[tickIndex] !== startMarkerIndex) {
                            this.squares[findPathArr[tickIndex]] = 'green'
                        }
                        tickIndex++
                    }
                } else {
                    finishedAnimatingFindPath = true
                    this.squares[endMarkerIndex] = 'gold'
                    tickIndex = 0
                }
                this.setSquares(this.squares.slice())
            } else {
                if (tickIndex < shortestPathArr.length - 1) {
                    this.squares[shortestPathArr[tickIndex]] = 'gold'
                    this.setSquares(this.squares.slice())
                    tickIndex++
                } else {
                    this.squares[shortestPathArr[shortestPathArr.length - 1]] = 'gold'
                    this.setSquares(this.squares.slice())
                    clearInterval(timerID2)
                }
            }
        }
    }
    returnToast = (tickArr) =>
    {
        if (tickArr[tickArr.length - 1] === false) {
            return this.toast("Path does not exist", 'warning', true)
        } else {
            this.squares[tickArr[tickArr.length - 1]] = 'gold'
            this.setSquares(this.squares.slice())
            return this.toast("Path does exist", 'success', true)
        }
    }
    toast = (message, appearance, autoDismiss) =>
    {
        return (
            this.addToast(message, {
                appearance: appearance,
                autoDismiss: autoDismiss,
            }))
    }
    resetBoardOnAlgorithmRun = (startMarkerIndex, endMarkerIndex) =>{
        for(let i = 0; i < this.squares.length; i++)
        {
            if(this.squares[i] !== 'black')
            {
                this.squares[i] = 'grey'
            }
        }
        this.squares[startMarkerIndex] = 'orange'
        this.squares[endMarkerIndex] = 'cornflowerblue'
        this.setSquares(this.squares.slice())
    }
}
export default animateMethods