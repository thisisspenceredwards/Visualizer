/*******************************************/
/*
Methods for Card messages and responses
 */
class MessagesForCard {
    constructor(cardMessages, backendOrFrontEnd, setCardMessages, setBackEndOrFrontEnd, setLoading)
    {
        this.setLoading = setLoading
        this.cardMessages = cardMessages
        this.backendOrFrontEnd = backendOrFrontEnd
        this.setCardMessages = setCardMessages
        this.setBackEndOrFrontEnd = setBackEndOrFrontEnd
    }
    backendResponse = (date1, data) => {
        this.setLoading(false)
        const date2 = new Date()
        const time = Math.abs(date2 - date1)
        this.updateMessages(data, 'Backend')
        this.updateMessages('Query round trip time: ' + time + " milliseconds", 'Frontend')
    }

    frontendInitialMessage = (message) => {
        this.setLoading(true)
        this.messageSeparator()
        this.updateMessages(message, 'Frontend')
    }
    messageSeparator = () => {
        this.updateMessages(" ", " *************************  ")
    }
    updateMessages = (data, sender) => {
        this.cardMessages.unshift(data)
        this.backendOrFrontEnd.unshift(sender)
        this.setCardMessages(this.cardMessages.slice())
        this.setBackEndOrFrontEnd(this.backendOrFrontEnd.slice())
    }
    clearCardMessages = () => {
        this.setCardMessages([])
        this.setBackEndOrFrontEnd([])
    }
}
export default MessagesForCard