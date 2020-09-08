import React, { Component } from 'react';
import Upgrades from './Upgrade';
import PowerUps from './PowerUps';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpgrades: false,
            showPowerUps: false,
            ten: false,
            fifty: false,
            hundred: false,
            fiveHundred: false,
            twoThousand: false,
            oneHundredThousand: false,
            threeHundredThousand: false,
            oneMillion: false,
            fiftyMillion: false,
            fiveHundredMillion: false,
            twoTimes: false,
            fiveTimes: false,
            tenTimes: false
        };
        
        this.toggleUpgrades = this.toggleUpgrades.bind(this);
        this.togglePowerUps = this.togglePowerUps.bind(this);
        this.setUpgrade = this.setUpgrade.bind(this);
    };

    toggleUpgrades() {
        this.setState({
            showUpgrades: !this.state.showUpgrades,
            showPowerUps: false
        });
    };

    togglePowerUps() {
        this.setState({
            showPowerUps: !this.state.showPowerUps,
            showUpgrades: false
        });
    };

    setUpgrade(u) {
        this.setState({
            [u]: true
        });
    };

  render() {
    return (
    <div class={this.props.isOpen ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Shop</p>
                <button class="delete" onClick={this.props.toggle.bind()} aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column" style={{textAlign: "right"}}>
                        <button type="button" onClick={this.toggleUpgrades} class="button is-primary is-large">Upgrades</button>
                    </div>
                    <div class="column">
                        <button type="button" onClick={this.togglePowerUps} class="button is-primary is-large">Power Ups</button>
                    </div>
                </div>
                {this.state.showUpgrades ? <Upgrades upgrades={this.state} setUpgrade={this.setUpgrade} pointsPerCorrect={this.props.pointsPerCorrect} setCorrect={this.props.setCorrect} setNewPoints={this.props.setNewPoints} points={this.props.points}/> : null}
                {this.state.showPowerUps ? <PowerUps setMultiplier={this.props.setMultiplier} setUpgrade={this.setUpgrade} upgrades={this.state} setNewPoints={this.props.setNewPoints} points={this.props.points}/> : null}
            </section>
        </div>
    </div>
    );
  }
}

export default Shop;