import React, { Component } from 'react';

class PowerUps extends Component {
    constructor(props) {
        super(props);

        this.buyUpgrade = this.buyUpgrade.bind(this);
    };

    buyUpgrade(price, item, index) {
        if (!this.props.upgrades[index]) {
            if (this.props.points >= price) {
                this.props.setNewPoints(this.props.points - price);
                this.props.setMultiplier(item);
                this.props.setUpgrade(index);
            };
        };
    };

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <hr/>
                    <h6>2x earnings per question&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 1000, 2, "twoTimes")} class="button is-success">{this.props.upgrades.twoTimes ? "Owned" : "-1,000"}</button></h6>
                    <h6>5x earnings per question&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 100000, 5, "fiveTimes")} class="button is-success">{this.props.upgrades.fiveTimes ? "Owned" : "-100,000"}</button></h6>
                    <h6>10x earnings per question&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 1000000, 10, "tenTimes")} class="button is-success">{this.props.upgrades.tenTimes ? "Owned" : "-1,000,000"}</button></h6>
            </div>
        );
    };
};

export default PowerUps;
