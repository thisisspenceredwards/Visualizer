export default class DepthFirstSearch
{
    constructor()
    {
        this.DFSUtil = this.DFSUtil.bind(this)
        this.DFS = this.DFS.bind(this)
    }
    DFSUtil(visited, start, end, dictionary, count, found, orderOfSearch)
    {
        if(found[0] === true) return
        let c = 0;
        if(start === end)
        {
            found[0] = true
            visited[start] = true
            orderOfSearch.push(start)
            console.log("END this is start and adjacent node and count:" + start + " " + count)
            return count
        }
        visited[start] = true
        orderOfSearch.push(start)
        for(let i = 0; i < dictionary[start].length; i++)
        {
            console.log("value of dictionary: " + dictionary[i])
            if(dictionary[i] !== -1 && visited[dictionary[start][i]] === false)
            {
                c = this.DFSUtil(visited, dictionary[start][i], end, dictionary, count + 1, found, orderOfSearch)
            }
        }
        return c
    }
    DFS(start, end, dictionary, SIZE){
        let visited = Array(SIZE).fill(false)
        let orderOfSearch = []
        let found = [false]
        this.DFSUtil(visited, start, end, dictionary, 0, found, orderOfSearch)
        return orderOfSearch
    }
}






