export default class DepthFirstSearch
{
    constructor()
    {
        this.DFSUtil = this.DFSUtil.bind(this)
        this.DFS = this.DFS.bind(this)
    }
    DFSUtil(visited, start, end, dictionary, found, orderOfSearch)
    {
        if(found[0] === true) return  //stop the search
        if(start === end) //eureka!
        {
            found[0] = true
            visited[start] = true
            orderOfSearch.push(start)
        }
        visited[start] = true
        orderOfSearch.push(start) //this is to track the order of visited nodes

        for(let i = 0; i < dictionary[start][0].length; i++)
        {
            if(dictionary[i][0] !== -1 && visited[dictionary[start][0][i]] === false)
            {
                this.DFSUtil(visited, dictionary[start][0][i], end, dictionary, found, orderOfSearch)
            }
        }
    }
    DFS(start, end, dictionary, SIZE){
        let visited = Array(SIZE).fill(false)
        let orderOfSearch = []
        let found = [false]
        this.DFSUtil(visited, start, end, dictionary, found, orderOfSearch)
        if(found[0] === false)
        {
            return [...orderOfSearch, false]
        }
        return orderOfSearch
    }
}






