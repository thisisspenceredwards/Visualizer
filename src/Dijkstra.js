 export default class Dijkstra {

     constructor(weights, dictionary, start, end, size)
     {
          this.searchingVisited = Array(size).fill(false)
          this.visited = Array(size).fill(false)
          this.weights = weights
          this.distances = Array(size).fill(Infinity)
          this.distances[start] = -1
          this.dictionary = dictionary
          this.start = start
          this.end = end
          this.shortestPathBack = []
          this.orderOfSearch = []
          this.dijkstra = this.dijkstra.bind(this)
          this.dijkstraUtil = this.dijkstraUtil.bind(this)
          this.computeShortestPath = this.computeShortestPath.bind(this)
     }
     dijkstra(){
          this.dijkstraUtil()
          this.computeShortestPath()
          //return this.orderOfSearch
          return [this.orderOfSearch, this.shortestPathBack]
          //return this.shortestPathBack

     }
     computeShortestPath()
     {
          let index = this.end
          this.shortestPathBack.push(this.end)
          while(index !== this.start)
          {
               console.log("This is the dictionary: " + this.dictionary[index][0])
               console.log("this is index: " + index)
               let minWeight = Infinity
               let minWeightIndex = -1
               let node = this.dictionary[index][0]
               for(let i = 0; i < node.length; i++)
               {
                    console.log("this is node[i]: " + node[i])
                    console.log("this is node[i]'s weight" + this.distances[node[i]])
                    if(this.distances[node[i]] < minWeight && this.visited[node[i]] === false){
                         minWeight = this.distances[node[i]]
                         minWeightIndex = node[i]
                    }
               }
               this.shortestPathBack.push(minWeightIndex)
               this.visited[minWeightIndex] = true
               index = minWeightIndex
               if(index === -1)
                    return
          }
          this.shortestPathBack.push(this.start)
     }
     dijkstraUtil(){
         //this.visited, this.start. this.end, this.dictionary, this.found, this.orderOfSearch
          let queue =  {...this.dictionary} //shallow copy, should be ok because I do not modify entries
          while(Object.keys(queue).length > 0) //while not empty
          {//select node with the minimum distance/weight first run through that will be start node
               let finalMinDistance = Number.MAX_VALUE
               let finalMinIndex = -1
               for( const[key, value] of Object.entries(queue))
               {
                    let index = value[2]
                    if(this.distances[index] < finalMinDistance && this.searchingVisited[index] === false)
                    {
                         finalMinDistance = this.distances[index]
                         finalMinIndex = key //index of node with smallest value in distance array
                    }
               }
               let node = queue[finalMinIndex][0].slice() //pull out adjacent node array
               this.searchingVisited[finalMinIndex] = true
               delete queue[finalMinIndex] //remove from queue
               for(let i = 0; i < node.length; i++) {
                    const totalDistance = this.distances[finalMinIndex] + this.weights[node[i]]
                    if (totalDistance < this.distances[node[i]]) {
                         this.distances[node[i]] = totalDistance
                         this.orderOfSearch.push(node[i])
                    }
               }
          }
     console.log(this.distances)
     }
 }

