import axios from "axios";
/*
creates a function that returns a function that is responsible for messaging the backend,
animating the return values
or
responding that there are no return values to animate
 */


export const queryBackendHigherOrderFunctionMaze =  (testingUrl, SIZE, WIDTH, HEIGHT, backendResponse, addToast, setBlockedNodes, setSquares) =>

    async (urlSuffix, startMarkerIndex, endMarkerIndex, squares, blockedNodes, weights) =>
    {

    await axios.post(testingUrl + urlSuffix, {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
    .then(res=>{
        const date1 = new Date()
        backendResponse(date1, res.data[0])
        let arr = res.data[1]
        let tempBlockedNodes = Array(SIZE).fill(false)
        for(let i = 0; i < arr.length; i++)
        {
            if(arr[i] === 'black')
                tempBlockedNodes[i] = true
        }
        setBlockedNodes(tempBlockedNodes)
        setSquares(res.data[1])
    })
    .catch(err => {console.error(err)})
    }





export const queryBackendHigherOrderFunctionSPF =  (testingUrl, SIZE, WIDTH, backendResponse, addToast) =>

    async  (urlSuffix, startMarkerIndex, endMarkerIndex, blockedNodes, weights, animate) => {

            await axios.post(testingUrl  + urlSuffix, {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes, weights
            })
                .then(res => {
                    const date1 = new Date()
                    backendResponse(date1, res.data[0])
                    if (res.data[1] !== null ) {
                        animate(res.data[1])
                    } else
                        return (
                            addToast("Path does not exist", {
                                appearance: 'warning',
                                autoDismiss: true,
                            }))
                })
                .catch(err => {
                    console.error(err)
                })
        }


