import axios from "axios";
/*
creates a function that returns a function that is responsible for messaging the backend,
animating the return values
or
responding that there are no return values to animate
 */







const queryBackendHigherOrderFunction =  (testingUrl, SIZE, WIDTH, dialogToOutput, addToast) =>

    async  (urlSuffix, startMarkerIndex, endMarkerIndex, blockedNodes, weights, animate) => {

            await axios.post(testingUrl  + urlSuffix, {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes, weights
            })
                .then(res => {
                    const date1 = new Date()
                    dialogToOutput(date1, res.data[0])
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

export default queryBackendHigherOrderFunction