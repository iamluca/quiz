import React, { Component } from 'react';

class Upgrades extends Component {
    constructor(props) {
        super(props);

        this.buyUpgrade = this.buyUpgrade.bind(this);
    };

    buyUpgrade(price, item, index) {
        if (!this.props.upgrades[index]) {
            if (this.props.points >= price) {
                this.props.setNewPoints(this.props.points - price);
                this.props.setCorrect(this.props.pointsPerCorrect + item);
                this.props.setUpgrade(index);
            };
        };
    };

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <hr/>
                <h6>+10 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 10, 10, "ten")} class="button is-success">{this.props.upgrades.ten ? "Owned" : "-10"}</button></h6>
                <h6>+50 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 100, 50, "fifty")} class="button is-success">{this.props.upgrades.fifty ? "Owned" : "-100"}</button></h6>
                <h6>+100 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 1000, 100, "hundred")} class="button is-success">{this.props.upgrades.hundred ? "Owned" : "-1,000"}</button></h6>
                <h6>+500 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 10000, 500, "fiveHundred")} class="button is-success">{this.props.upgrades.fiveHundred ? "Owned" : "-10,000"}</button></h6>
                <h6>+2000 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 100000, 2000, "oneHundredThousand")} class="button is-success">{this.props.upgrades.oneHundredThousand ? "Owned" : "-100,000"}</button></h6>
                <h6>+5000 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 300000, 5000, "threeHundredThousand")} class="button is-success">{this.props.upgrades.threeHundredThousand ? "Owned" : "-300,000"}</button></h6>
                <h6>+10000 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 1000000, 10000, "oneMillion")} class="button is-success">{this.props.upgrades.oneMillion ? "Owned" : "-1,000,000"}</button></h6>
                <h6>+250000 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 50000000, 250000, "fiftyMillion")} class="button is-success">{this.props.upgrades.fiftyMillion ? "Owned" : "-50,000,000"}</button></h6>
                <h6>+1000000 per correct&nbsp;<button type="button" onClick={this.buyUpgrade.bind(null, 500000000, 1000000, "fiveHundredMillion")} class="button is-success">{this.props.upgrades.fiveHundredMillion ? "Owned" : "-500,000,000"}</button></h6>
            </div>
        );
    };
};

export default Upgrades;
