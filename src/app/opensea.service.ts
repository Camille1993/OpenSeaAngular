import { Injectable } from "@angular/core";

const baseUrl = 'https://testnets-api.opensea.io/api/v1';
function queryParams(params: Record<string, string | number>) {
 return Object.entries(params)
 .map(([key, value]) => `${key}=${value}`)
 .join('&');
}
function get(url: string) {
  return fetch(`${baseUrl}/${url}`).then(res => res.json)
}

@Injectable({providedIn: 'root'})
export class OpenSea {

  /**
  * allow to get asset of a specific wallet adress
  * query params : owner, order_direction, offset, limit
  * @param params
  * @returns json object
  **/  
  getAssets(params : any) {    
    return get(`assets?${queryParams(params)}`);   
  }

  /**
   * allow to get more information on the asset
   * in function of the token_Id and the contract address for the concerned NFT
   * @param assetContractAddress 
   * @param tokenId 
   * @returns 
   */
  getAsset(assetContractAddress: string, tokenId: number ) {
    return get(`asset/${assetContractAddress}/${tokenId}`)
  }

  /**
   * allow to get a list of event that occur on the OpenSea tracks.
   * API key require in order to use this endpoint.
   * query params : asset_contract_address, only_opensea, offset, limit
   * @param params 
   * @returns json object
   */
  getEvents(params: any) {
    return get(`events?${queryParams(params)}`);
  }

  /**
   * allow to get more information about an contract asset
   * @param assetContractAddress 
   * @returns json object
   */
  getContract(assetContractAddress: string) {
    return get(`asset_contract/${assetContractAddress}`);
  }

  /**
   * allow to get the collections of a wallet adress
   * query params : asset_owner, offset, limit
   * @param params 
   * @returns json object
   */
  getCollections(params: any) {
    return get(`collections?${queryParams(params)}`);
  }

  /**
   * allow to retrieve one collection in function of the slug (collection name)
   * @param slug 
   * @returns json object 
   */
  getCollection(slug: string) {
    return get(`collection/${slug}`)
  }

  /**
   * allow to retrieve the stats of a collection base on the slug
   * @param slug 
   * @returns json object
   */
  getCollectionStat(slug: string) {
    return get(`collection/${slug}/stats`);
  }

  /**
   * allow to get bundles (groups of items for sale)
   * query params : offset, limit
   * @param params 
   * @returns json object
   */
  getBundles(params: any) {
    return get(`bundles?${queryParams(params)}`)
  }
}