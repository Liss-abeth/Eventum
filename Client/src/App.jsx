import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/register';
import Login from './components/login';
import Adminhome from './components/Admin/adminhome';
import Addevents from './components/Coordinator/addevents';
import Viewuserevents from './components/User/userviewevents';
import Coordinatorhome from './components/Coordinator/coordinatorhome';
import Userhome from './components/User/userhome';
import Book from './components/User/book';
import BookingStatus from './components/User/bookingstatus';
import ViewAdminEvents from './components/Admin/adminviewevent';
import Myevent from './components/Coordinator/myevent';
import ReviewPage from './components/User/review';
import ConformBooking from './components/Coordinator/confirm';
import ConfirmBooking from './components/Coordinator/confirm';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/adminhome" element={<Adminhome />}/>
        <Route path="/coordinatorhome" element={<Coordinatorhome />}/>
        <Route path="/events" element={<Addevents/>}/>
        <Route path="/userviewevents" element={<Viewuserevents/>}/>
        <Route path="/userhome" element={<Userhome />}/>
        <Route path="/book" element={<Book />} />
        <Route path="/booking-status" element={<BookingStatus/>}/>
        <Route path="/adminviewevents" element={<ViewAdminEvents />} />
        <Route path="/myevent" element={<Myevent />} />
        <Route path='/review' element={<ReviewPage/>}/>
        <Route path="/testimonials" element={<ReviewPage />} />
         <Route path="/conformbooking" element={<ConfirmBooking/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
