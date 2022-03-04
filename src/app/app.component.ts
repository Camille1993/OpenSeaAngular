import { Component } from '@angular/core';
import { OpenSea } from './opensea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openSea-Angular';
  constructor(private openSea: OpenSea) {}

  async connect() {
    const provider = (window as any).ethereum;
    if (!provider) alert ('Create your Metamask account!');
    await provider.request({method: 'eth_requestAccounts'});
  }

  async getAssets() {
    const assets = await this.openSea.getAssets({
        owner: '0x0806c4efa94a549f1071c312e5c39dc61f4726a5',
        orderDirection: 'desc',
        offset: 0,
        limit: 20,
      });
    console.log(assets);
  }
  
  async getEvents() {
    const events = await this.openSea.getEvents({
      assetContractAddress: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
      onlyOpensea: 'false',
      offset: 0,
      limit: 20,
    });
    console.log(events);
  }

  async getCollections() {
    const collections = await this.openSea.getCollections({
      assetOwner: '0x0806c4efa94a549f1071c312e5c39dc61f4726a5',
      offset: 0,
      limit: 300,
});
    console.log(collections);    
  }

  async getBundles() {
    const bundles = await this.openSea.getBundles({
      offset: 0,
      limit: 20,
    });
    console.log(bundles);    
  }

  async getSingleAsset() {
    const asset = await this.openSea.getAsset('0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', 1);
    console.log(asset);
  }

  async getSingleContract() {
    const contract = await this.openSea.getAssetContract('0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656');
    console.log(contract);
  }

  async getSingleCollection() {
    const collection = await this.openSea.getCollection('birdy-family');
    console.log(collection);    
  }

  async getSingleCollectionStat() {
    const stats = await this.openSea.getCollectionStat('birdy-family');
    console.log(stats);    
  }
}
