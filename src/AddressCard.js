import React, { Component } from 'react';
import { bonds, InlineAccount, InlineBalance, AccountIcon, AddressLabel, AccountLabel } from 'parity-reactive-ui';
import { Header, Card, Image } from 'semantic-ui-react';
import {Bond} from 'oo7';
import { formatBalance } from 'oo7-parity';
import { ReactiveComponent, Rspan, Rimg } from 'oo7-react';

import styles from './AddressCard.css';

//TODO: Add this to semantic-ui-react
export default class AddressCard extends Component{
  constructor(){
    super();
  }

  render(){
    let addressBond = new Bond();
    addressBond.changed(this.props.info.address);
    let balanceBond = bonds.balance(this.props.info.address);
    let bondi = bonds.tokensOf(this.props.info.address).then((ret)=>{
      //console.log('tokens',ret)
    })
    bonds.githubhint.entries("0xd40679a3a234d8421c678d64f4df3308859e8ad07ac95ce4a228aceb96955287").then((ret)=>{
      //console.log('imgs',ret)
    })

    //console.log('accinfo',);
    return (<Card className={styles.AddressCard} >
        <Card.Content>
          <Image floated="right"><AccountIcon address={this.props.info.address} /></Image>
          <Card.Header as='h3'>{this.props.info.name}</Card.Header>
          <Card.Meta>{this.props.info.meta.description}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <AddressLabel address={addressBond} />
      </Card.Content>
      <Rspan></Rspan>
      <CoinList tokens={bonds.tokensOf(this.props.info.address)}/>
    </Card>);
  }
}

class CoinList extends ReactiveComponent{
  constructor(){
    super(['tokens']);
  }
  render(){
    //console.log('toki',this.state.tokens);
    if(typeof this.state.tokens == "undefined") return <Card.Content></Card.Content>
    return (<Card.Content>
      {this.state.tokens.map((elem)=>{
        return (<div>
          <span>{elem.name}:{elem.balance.toString()}</span>
          <Rimg src={bonds.githubhint.entries(elem.img).map((imgObj)=>{
            console.log('img', imgObj[0]);
            return imgObj[0]
          })}></Rimg>
        </div>);
      })}
    </Card.Content>);
  }
}
//
// let ownedTokenBond = bonds.tokens.map((ls)=>{
//   console.log(ls[0].tla);
//   let owned = []
//   for(let num in ls){
//     if(ls[num].tla == "GAV") owned.push(ls[num]);//need new way to filtr
//   }
//   return owned;
// })
