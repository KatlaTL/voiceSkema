import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        type: "skema",
        name: "",
        schedule: {
            student: {
                name: "Asger",
                studentId: "100"
            },
            courses: [
                {
                    name: "course1",
                    date: "18-09-2017",
                    startTime: "08:30",
                    endTime: "12:00",
                    local: "101",
                    teacher: "LAM"
                },
                {
                    name: "course2",
                    date: "20-09-2017",
                    startTime: "08:30",
                    endTime: "12:00",
                    local: "101",
                    teacher: "BORG"
                },
                {
                    name: "course2",
                    date: "20-09-2017",
                    startTime: "12:30",
                    endTime: "16:00",
                    local: "101",
                    teacher: "BORG"
                },
                {
                    name: "course1",
                    date: "21-09-2017",
                    startTime: "12:30",
                    endTime: "16:00",
                    local: "101",
                    teacher: "LAM"
                }
            ]
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log())
    }

    searchSchedule() {
        fetch("")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    schedule: res
                }, () => console.log())
            })
    }

    renderCourse(time, date) {
        return this.state.schedule.courses.map((course, index) => {
            if (course != null) {
                if(course.startTime === time && course.date === date)
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
                <th>{this.renderCourse("08:30","18-09-2017")}</th>
                <th>{this.renderCourse("08:30","19-09-2017")}</th>
                <th>{this.renderCourse("08:30","20-09-2017")}</th>
                <th>{this.renderCourse("08:30","21-09-2017")}</th>
                <th>{this.renderCourse("08:30","22-09-2017")}</th>
                <th>{this.renderCourse("08:30","23-09-2017")}</th>
                <th>{this.renderCourse("08:30","24-09-2017")}</th>
            </tr>
            <tr>
                <th>12:30 - 16:00</th>
                <th>{this.renderCourse("12:30","18-09-2017")}</th>
                <th>{this.renderCourse("12:30","19-09-2017")}</th>
                <th>{this.renderCourse("12:30","20-09-2017")}</th>
                <th>{this.renderCourse("12:30","21-09-2017")}</th>
                <th>{this.renderCourse("12:30","22-09-2017")}</th>
                <th>{this.renderCourse("12:30","23-09-2017")}</th>
                <th>{this.renderCourse("12:30","24-09-2017")}</th>
            </tr>
            </tbody>
        </table>;
        return table;
    }

    render() {
        return (
            <div className="App">
                <p>{this.state.name}</p>
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
