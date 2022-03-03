import { Injectable } from "@angular/core";

const baseUrl = 'https://testnets-api.opensea.io/api/v1';
function queryParams(params: Record<string, string | number>) {
 return Object.entries(params)
 .map(([key, value]) => `${key}=${value}`)
 .join('&');
}

@Injectable({providedIn: 'root'})
export class OpenSea {
  getAssets(params : any) {
    const url = `${baseUrl}/assets?${queryParams(params)}`;
    return fetch(url).then(res => res.json());    
  }

  getEvents(contractAddress: string) {
    const url = `${baseUrl}/events?asset_contract_address=${contractAddress}&only_opensea=false&offset=0&limit=20`;
    return fetch(url).then(res => res.json());
  }

  getCollections(owner: string) {
    const url = `${baseUrl}/collections?asset_owner=${owner}&offset=0&limit=300`;
    return fetch(url).then(res => res.json());
  }

  getBundles() {
    const url = `${baseUrl}/bundles?limit=20&offset=0`;
    return fetch(url).then(res => res.json());
  }

  getAsset(assetContractAdress: string, tokenId:number ) {
    const url = `${baseUrl}/asset/${assetContractAdress}/${tokenId}`;
    return fetch(url).then(res => res.json());
  }
  getContract(assetContractAdress: string) {
    const url = `${baseUrl}/asset_contract/${assetContractAdress}`;
    return fetch(url).then(res => res.json());
  }

  getCollection(slug: string) {
    const url = `${baseUrl}/collection/${slug}`;
    return fetch(url).then(res => res.json());
  }
  getCollectionStat(slug: string) {
    const url = `${baseUrl}/collection/${slug}/stats`;
    return fetch(url).then(res => res.json());

  }
}