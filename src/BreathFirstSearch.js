


export default class BreathFirstSearch
{
    constructor()
    {
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
                return
            }
            for(let i = 0; i < dictionary[node].length; i++) {
                let newNode = dictionary[node][i]
                if(visited[newNode] === false) {
                    visited[newNode] = true
                    queue.push(newNode)
                }
            }
        }
    }
    BFS(start, end, dictionary, SIZE)
    {
        let visited = Array(SIZE).fill(false)
        let orderOfSearch = []
        let found = [false]
        this.BFSUtil(visited, start, end, dictionary, found, orderOfSearch)
        return orderOfSearch
    }
}



