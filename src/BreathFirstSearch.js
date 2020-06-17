export default class BreathFirstSearch
{
    constructor()
    {
        this.shortestPathBack = []
        this.orderOfSearch = []
        this.BFS = this.BFS.bind(this)
        this.BFSUtil = this.BFSUtil.bind(this)
    }
    BFSUtil(visited, start, end, dictionary, found, orderOfSearch)
    {
        const queue = []
        queue.push(start)
        visited[start] = true
        while(queue.length > 0) {
            let node = queue.shift()
            orderOfSearch.push(node)
            if(node === end) {
                break
            }
            for(let i = 0; i < dictionary[node][0].length; i++) {
                let newNode = dictionary[node][0][i]
                if(visited[newNode] === false) {
                    visited[newNode] = true
                    //console.log("this is node: " + node)
                    //console.log("this is newNode: " + newNode)
                    dictionary[newNode][1] = node
                    queue.push(newNode)
                }
            }
        }
        this.followPathBack(start, end, dictionary)
    }
    followPathBack(start, end, dictionary)
    {
        let parent = dictionary[end][1]
        while(parent !== null){
            this.shortestPathBack.push(parent)
            parent = dictionary[parent][1]
        }
    }
    BFS(start, end, dictionary, SIZE)
    {
        let visited = Array(SIZE).fill(false)
        let found = [false]
        this.BFSUtil(visited, start, end, dictionary, found, this.orderOfSearch)
        return [this.orderOfSearch, this.shortestPathBack]
    }
}



