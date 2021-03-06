import React, { Component } from 'react'
import { connect } from 'react-redux'

class Clock extends Component {
    constructor(props) {
        super(props)
        this.tickRate = this.props.globalTickRate // Frequency of ticks in ms -- Real time is 1000
        this.timeSpeed = this.props.globalTimeSpeed // Multiplier for each time step -- Real time is 1
        this.maxTime = this.props.globalMaxTime // Maximum time per artwork loop in seconds -- Keep to 86400 for real time
    }

    tick() {
        this.props.dispatch({type: "GLOBAL_TIME", "payload": this.getCurrentComputedSeconds(this.props.globalTimeSpeed)})
    }

    componentDidMount() {
        // Interval for tickrate
        const timeInterval = setInterval(() => this.tick(), this.props.globalTickRate)
        this.setState({timeInterval})

        this.tick() // Tick once before interval starts
    }

    componentWillUnmount() {
        clearInterval(this.state.timeInterval)
    }

    getCurrentDaySeconds() {
        let date = new Date()
        let seconds = date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours())
        return seconds
    }

    getCurrentComputedSeconds(multiplier) {
        if (this.props.globalTime == null) {
            return this.getCurrentDaySeconds()
        }
        if (this.props.globalTime >= this.props.globalMaxTime){
            return 0
        }
        return this.props.globalTime + (1 * multiplier)
    }

    render() {
        return null
    }
}
    
export default connect(state => state)(Clock);
