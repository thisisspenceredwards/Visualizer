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
            if(visited[dictionary[start][i]] === false)
            {
                c = this.DFSUtil(visited, dictionary[start][i], end, dictionary, count + 1, found, orderOfSearch)
            }
        }
        return c
    }
    DFS(start, end, dictionary, SIZE){ //start at, well start and look for end point
        let visited = Array(SIZE).fill(false)
        let orderOfSearch = []
        let found = [false]
        this.DFSUtil(visited, start, end, dictionary, 0, found, orderOfSearch)
        return orderOfSearch
    }

    createContainer(size, width)
    {//diagonals are also valid
        let dict = {}
        for(let i = 0; i < size; i++)
        {
            if(i< width) {
                if (i < width && i % width === 0) { //top left
                    dict[i] = [i + 1, i + width, i + width + 1]
                } else if (i < width && width % i === 1) //top right
                {
                    dict[i] = [i - 1, i + width - 1, i + width]
                } else //first row in the middle
                {
                    dict[i] = [i - 1, i + 1, i + width - 1, i + width, i + width + 1]
                }
            }
            else if(i >= size-width)
            {
                if(i%width === 0) //bottom left
                {
                    dict[i] = [i-width, i-width+1, i+1]
                }//FIX BELOW AS IT IS FUCKED
                else if(i === size-1) //right side
                {
                    dict[i] = [i-width-1, i-width, i-1]
                }
                else //a center node in the last row
                {
                    dict[i] = [i - width -1, i - width, i - width +1, i-1, i + 1]
                }
            }
            else //should be in the center somewhere
            {
                if(i%width === 0)//left side not top or bottom row
                {
                    dict[i] = [i-width, i-width+1, i+1, i+width, i+width+1]
                }
                else if(i%width === width-1) //right side not top or bottom row
                {
                    dict[i] = [i-width-1, i-width, i-1, i+width-1, i+width]
                }
                else {
                    dict[i] = [i - width - 1, i - width, i - width + 1, i - 1, i + 1, i + width - 1, i + width, i + width + 1]

                }
            }
        }
        return dict
    }



}






