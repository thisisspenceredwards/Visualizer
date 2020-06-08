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

    createContainer(size, width, blockedNodes)
    {//diagonals are also valid
        //console.log("CREATE CONTAINER")
        let dict = {}
        //console.log("this is blockedNodes:" + blockedNodes)
        for(let i = 0; i < size; i++)
        {
            if(blockedNodes[i] === true) {
                //console.log("index is blocked:" + i)
                dict[i] = []
            }
            else {
                let tempMap = new Map()
                tempMap.set("iPlusOne", i + 1)
                tempMap.set("iMinusOne", i - 1)
                tempMap.set("iMinusWidth", i - width)
                tempMap.set("iMinusWidthMinusOne", i - width - 1)
                tempMap.set("iMinusWidthPlusOne", i - width + 1)
                tempMap.set("iPlusWidth", i + width)
                tempMap.set("iPlusWidthMinusOne", i + width - 1)
                tempMap.set("iPlusWidthPlusOne", i + width + 1)
                for (let [key, value] of tempMap) {
                    if (blockedNodes[value] === true || value < 0 || value >= size) {
                        console.log("setting key/value to -1:" + key + ":" + value)
                        tempMap.set(key, -1)
                    }
                }
                if (i < width) {
                    if (i < width && i % width === 0) { //top left
                        dict[i] = [tempMap.get("iPlusOne"), tempMap.get("iPlusWidth"), tempMap.get("iPlusWidthPlusOne")]
                        //dict[i] = [i + 1, i + width, i + width + 1]
                    } else if (i < width && width % i === 1) //top right
                    {
                        dict[i] = [tempMap.get("iMinusOne"), tempMap.get("iPlusWidthMinusOne"), tempMap.get("iPlusWidth")]
                    } else //first row in the middle
                    {
                        dict[i] = [tempMap.get("iMinusOne"), tempMap.get("iPlusOne"), tempMap.get("iPlusWidthMinusOne"), tempMap.get("iPlusWidth"), tempMap.get("iPlusWidthPlusOne")]
                    }
                } else if (i >= size - width) {
                    if (i % width === 0) //bottom left
                    {
                        dict[i] = [tempMap.get("iMinusWidth"), tempMap.get("iMinusWidthPlusOne"), tempMap.get("iPlusOne")]
                    }
                    else if (i === size - 1) //right side
                    {
                        dict[i] = [tempMap.get("iMinusWidthMinusOne"), tempMap.get("iMinusWidth"), tempMap.get("iMinusWidthPlusOne"), tempMap.get("iMinusOne"), tempMap.get("iPlusOne")]
                    } else //a center node in the last row
                    {
                        dict[i] = [tempMap.get("iMinusWidthMinusOne"), tempMap.get("iMinusWidth"), tempMap.get("iMinusWidthPlusOne"), tempMap.get("iMinusOne"), tempMap.get("iPlusOne")]
                    }
                } else //should be in the center somewhere
                {
                    if (i % width === 0)//left side not top or bottom row
                    {
                        dict[i] = [tempMap.get("iMinusWidth"), tempMap.get("iMinusWidthPlusOne"), tempMap.get("iPlusOne"), tempMap.get("iPlusWidth"), tempMap.get("iPlusWidthPlusOne")]
                    } else if (i % width === width - 1) //right side not top or bottom row
                    {
                        dict[i] = [tempMap.get("iMinusWidthMinusOne"), tempMap.get("iMinusWidth"), tempMap.get("iMinusOne"), tempMap.get("iPlusWidthMinusOne"), tempMap.get("iPlusWidth")]
                    } else {
                        dict[i] = [tempMap.get("iMinusWidthMinusOne"), tempMap.get("iMinusWidth"), tempMap.get("iMinusWidthPlusOne"), tempMap.get("iMinusOne"), tempMap.get("iPlusOne"), tempMap.get("iPlusWidthMinusOne"), tempMap.get("iPlusWidth"), tempMap.get("iPlusWidthPlusOne")]
                    }
                }
                dict[i].sort()
                let j = 0
                while(dict[i][j] === -1 && j < dict[i].length)
                {
                    console.log(dict[i][j])
                    if(dict[i][j] === -1)
                    {
                       dict[i].splice(j, 1)
                    }
                    j++
                }
                const set = new Set(dict[i])
                dict[i] = [...set]
            }
        }
        return dict
    }
}






