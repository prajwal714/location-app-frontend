import React, { Component } from 'react'
import io from 'socket.io-client'

const endPoint='https://location-app123.herokuapp.com/';
class Application extends Component {
  constructor(props){
    super(props);

    this.state = { 
        isLoading: true,
        myPosition: {
          latitude: 0,
          longitude: 0,
          timestamp: 0
     },
     response: null,
     time: null
    }

  }
   updatedPos=(socket)=>{
     const {myPosition}=this.state;
     console.log(myPosition);
    try {
   
      const res=Math.random()*(100);
        socket.emit("position", myPosition); // Emitting a new message. It will be consumed by the client
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
  }



    componentDidMount(){
        const socket=io.connect(endPoint);

socket.on("time", (timeString)=>{
  console.log("Time from server", timeString);
  this.setState({time: timeString});
})

        // socket.on("FromAPI", data=>this.setState({response: data}));

        console.log(socket);
        navigator.geolocation.watchPosition(
           position => {
            // console.log('position===========================', position)

            // socket.emit('position', {
            //    data: position,
            //    id: socket.id,
            //  });


             let tempPosition = { ...this.state.myPosition };
             tempPosition.latitude = position.coords.latitude;
             tempPosition.longitude = position.coords.longitude;
             tempPosition.timestamp=position.timestamp;
             this.setState({
               myPosition: tempPosition,
               isLoading: false,
             });

             this.updatedPos(socket);
           },
           error => console.log(error)
         );
       }
    
    




    render() { 
        
        return (<div>
            <h1> Welcome to Location App</h1>
            <h3> Current Time: {this.state.time} </h3>
            <p>Lat: {this.state.myPosition.latitude}</p> 
            <p>Long: {this.state.myPosition.longitude}</p> 

        </div>  );
    }
}
 
export default Application;

// class Application extends React.Component {
  
  
//     this.state = {
//       isLoading: true,
//       myPosition: {
//         latitude: 0,
//         longitude: 0,
//         timestamp: 0,
//       }

  
  
//   componentDidMount() {
//     //   this.watchId = navigator.geolocation.watchPosition(
//     //     (position) => {
//     //       this.socket.emit('position', {
//     //         data: position,
//     //         id: this.id
//     //       })

//     //       let tempPosition = {...this.state.myPosition};
//     //       tempPosition.latitude = position.coords.latitude
//     //       tempPosition.longitude = position.coords.longitude

//     //       this.setState({
//     //         myPosition: tempPosition,
//     //         isLoading: false
//     //       });
//     //     },
//     //     (error) => console.log(error),
//     //     { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
//     //   );
//     // }

//     navigator.geolocation.getCurrentPosition(
//       position => {
//         // console.log('position===========================', position)
//         // this.socket.emit('position', {
//         //   data: position,
//         //   id: this.id,
//         // });
//         console.log(position);
//         let tempPosition = { ...this.state.myPosition };
//         tempPosition.latitude = position.coords.latitude;
//         tempPosition.longitude = position.coords.longitude;

//         this.setState({
//           myPosition: tempPosition,
//           isLoading: false,
//         });
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 }
//     );
//   }
  
//   render() {
//     return <div>
     
      
      
      
      
      
      
//     </div>;
//   }
// }

// /*
//  * Render the above component into the div#app
//  */
// React.render(<Application />, document.getElementById('app'));