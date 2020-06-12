

//A dictionary has an array containing an array of adjacent nodes, and an entry for the node's parent
// dict = [[adjacent nodes], parentvalue, index of self]
// index of self is for Dijkstras


const createContainer = (size, width, blockedNodes)=>
{//diagonals are also valid
    let dict = {}
    for(let i = 0; i < size; i++)
    {
        if(blockedNodes[i] !== true)
        {
            //A map was likely unnecessary here, but it made keeping track of everything much easier
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
                    tempMap.set(key, -1)
                }
            }
            if (i < width) {
                if (i < width && i % width === 0) { //top left
                    dict[i] = [tempMap.get("iPlusOne"), tempMap.get("iPlusWidth"), tempMap.get("iPlusWidthPlusOne")]
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
                if(dict[i][j] === -1)
                {
                    dict[i].splice(j, 1)
                }
                j++
            }
            const set = new Set(dict[i])
            dict[i] = [[...set], null, i]
        }
    }
    return dict
}

export default createContainer