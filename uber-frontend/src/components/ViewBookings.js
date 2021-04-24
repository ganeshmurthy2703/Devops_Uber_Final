import { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import {getbookings, deletebooking} from "./BookingApiCalls"

class ViewBookings extends Component {

    constructor(props){
        super(props)
        this.state = {
            bookings: []
        };
        this.fetchBookings = this.fetchBookings.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
        
    }

    componentDidMount() {
        console.log("agian !!!!")
       this.fetchBookings();
    }

    fetchBookings() {
        getbookings().then( response => {
            console.log("broooo")
            let mainRes = JSON.parse(JSON.stringify(response)) 
            let indexKeys = Object.keys(mainRes);
            console.log(indexKeys);
            var resArr = []
            indexKeys.forEach(element => {
                resArr.push(mainRes[element])     
            });
            this.setState({
                bookings: resArr
            }, () => {console.log(this.state)})
        }).catch(err => {
            console.log(err);
        })
    }

    getFormattedDate(date){
        let parsedDate = new Date(date);

        let str = parsedDate.toUTCString().split(' ');
        str.pop();
        str.pop();

        return str.join(" ");
    }
        
        deleteBooking(booking){
            deletebooking(booking).then(response => {
                // console.log("got resposne")
                // console.log(JSON.stringify(response));
                this.fetchBookings()
            } ) ;
            // this.forceUpdate();
        }


    render() {
        return <div>
            
        {this.state.bookings.map(booking => {

         return <Card>
            <CardBody>
            <CardTitle tag="h5">
                {booking.source} 
                &#10140;
                {booking.destination}
            </CardTitle>

            <CardTitle tag="h5">{this.getFormattedDate(booking.date)}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Happy Journey!</CardSubtitle>
        <Button onClick={() => this.deleteBooking(booking)}>Delete this booking</Button>
</CardBody>
</Card>
        })}
        
        </div>
    }
}

export default ViewBookings;