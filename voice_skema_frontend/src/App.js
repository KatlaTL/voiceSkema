import React, {Component} from 'react';
import './App.css';
import fetchHelper from "./fetchHelpers";

class App extends Component {
    constructor() {
        super();
        this.state = {
            type: "skema",
            name: "",
            schedule: {
                student: {
                },
                courses: []
            }
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log())
    }

    searchSchedule() {
        console.log(this.state.schedule);
        const options = fetchHelper.makeOptions("GET", true);
        fetch("http://localhost:8084/SkemaBackend/api/skema/" + this.state.name, options)
            .then(res => res.json())
            .then(res => {
                console.log(res.schedule);
                this.setState({
                    schedule: res.schedule
                }, () => console.log(this.state.schedule))
            })
    }

    renderCourse(time, date) {
        return this.state.schedule.courses.map((course, index) => {
            if (course != null) {
                if (course.startTime === time && course.date === date)
                    return (
                        <div key={index}>
                            <h3>{course.name}</h3>
                            <p>Lokale: {course.local}</p>
                            <p>Lære: {course.teacher}</p>
                        </div>
                    )
            }
        })
    }

    renderSchedule() {
        let table = <table>
            <thead>
            <tr>
                <th></th>
                <th>Mandag 18/09</th>
                <th>Tirsdag 19/09</th>
                <th>Onsdag 20/09</th>
                <th>Torsdag 21/09</th>
                <th>Fredag 22/09</th>
                <th>Lørdag 23/09</th>
                <th>Søndag 24/09</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>08:30 - 12:00</th>
                <th>{this.renderCourse("08:30", "18-09-2017")}</th>
                <th>{this.renderCourse("08:30", "19-09-2017")}</th>
                <th>{this.renderCourse("08:30", "20-09-2017")}</th>
                <th>{this.renderCourse("08:30", "21-09-2017")}</th>
                <th>{this.renderCourse("08:30", "22-09-2017")}</th>
                <th>{this.renderCourse("08:30", "23-09-2017")}</th>
                <th>{this.renderCourse("08:30", "24-09-2017")}</th>
            </tr>
            <tr>
                <th>12:30 - 16:00</th>
                <th>{this.renderCourse("12:30", "18-09-2017")}</th>
                <th>{this.renderCourse("12:30", "19-09-2017")}</th>
                <th>{this.renderCourse("12:30", "20-09-2017")}</th>
                <th>{this.renderCourse("12:30", "21-09-2017")}</th>
                <th>{this.renderCourse("12:30", "22-09-2017")}</th>
                <th>{this.renderCourse("12:30", "23-09-2017")}</th>
                <th>{this.renderCourse("12:30", "24-09-2017")}</th>
            </tr>
            </tbody>
        </table>;
        return table;
    }

    render() {
        return (
            <div className="App">
                <form>
                    <input type="text" placeholder="Name" name="name" onChange={this.handleChange.bind(this)}/>
                    <input type="button" name="submit" value="submit" onClick={this.searchSchedule.bind(this)}/>
                </form>
                {this.renderSchedule()}
            </div>
        );
    }
}

export default App;
