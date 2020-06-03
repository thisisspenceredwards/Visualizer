//number of vertices
//in grid  x - x - x
//         |   |   |
//         x - x - x
//         |   |   |
//         x - x - x
// # of (rows * (colums - 1)) + (rows-1 * columns)

//first create graph

export default class DepthFirstSearch
{
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






