import React, { Component } from 'react'
import styles from '../../styles/Sky.module.css'

// Day Night Cycle notes
// Color gradient to pick background color from depending on time of day
// Sun/Moon setting in the middle of the screen, moving smoothly behind the scene, and animating in, in the middle of the sky.
// 7PM cutoff for day/night state

// oscillating gradient, with sun and moon in the middle of day/night rising/setting correctly.

class Artwork extends Component {
    constructor() {
        super()
        this.renderRef = React.createRef()
        this.skyRef = React.createRef()
        this.tickRate = 1000 // Frequency of ticks in ms -- Real time is 1000
        this.timeSpeed = 1 // Multiplier for each time step -- Real time is 1
        this.maxTime = 86400 // Maximum time per artwork loop in seconds -- Keep to 86400 for real time
        this.state = {
            computedTime: null,
            skyOffset: null
        }
    }

    tick() {
        this.setState({computedTime:this.getCurrentComputedSeconds(this.timeSpeed)})
        this.setState({skyOffset:this.getAbsoluteSkyOffset()})
    }

    getTickRateToSeconds() {
        return this.tickRate / 1000
    }

    getAbsoluteSkyOffset() {
        // Get the absolute offset in pixels for the sky element.
        // Calculated depending on current computedTime state.
        // it will need to reach maxOffset at oscillationTime.
        let time = this.state.computedTime
        let maxOffset = this.skyRef.current.offsetHeight - window.innerHeight
        let maxTime = this.maxTime
        let oscillationTime = maxTime / 2 // Mid Day.
        let step = maxOffset / oscillationTime // Each step in pixels
        let offset = 0
        // return maxOffset - diff
        if (time > oscillationTime) {
            // Sun Setting Offset decreasing
            offset = (maxTime - time) * step
        } else {
            // Sun Rising Offset increasing
            offset = time * step
        }
        return -Math.floor(offset)
    }

    getCurrentDaySeconds() {
        let date = new Date()
        let seconds = date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours())
        return seconds
    }

    getCurrentComputedSeconds(multiplier) {
        if (this.state.computedTime == null) {
            return this.getCurrentDaySeconds()
        }
        if (this.state.computedTime >= this.maxTime){
            return 0
        }
        return this.state.computedTime + (1 * multiplier)
    }

    componentDidMount() {
        this.setState({computedTime:this.getCurrentComputedSeconds()})
        this.tick() // Tick once before interval starts

        // Interval for tickrate
        const timeInterval = setInterval(() => this.tick(), this.tickRate)
        this.setState({timeInterval})
    }

    componentWillUnmount() {
        clearInterval(this.state.timeInterval);
    }

    render() {
        console.log("Rendering Sky")
        return (
        <div className={styles.skyContainer} style={{transition: "linear " + this.getTickRateToSeconds() + "s", top: this.state.skyOffset + "px"}} ref={this.skyRef}>
            <div className="sky-day">
                {this.state.time}
            </div>
        </div>
        );
    }
}
    
export default Artwork;