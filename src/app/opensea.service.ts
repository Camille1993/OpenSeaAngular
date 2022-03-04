import { Injectable } from "@angular/core";

const baseUrl = 'https://testnets-api.opensea.io/api/v1';
function queryParams(params: Record<string, any> = {}) {
 return Object.entries(params)
 .map(([key, value]) => `${camelToSnakeCase(key)}=${value}`)
 .join('&');
}

// regex to change camelCase to snake_case
function camelToSnakeCase(param?: any) {
  return param.split(/(?=[A-Z])/).join('_').toLowerCase();
}

function get(url: string) {   
  return fetch(`${baseUrl}/${url}`).then(res => res.json())
}

function getList(listType: string, params: Record<string, any> = {}) {
  const query = queryParams(params);
  const url = query ? `${baseUrl}/${listType}?${query}` : `${baseUrl}/${listType}`;
  return fetch(url).then(res=> res.json())
}

interface ListParam {
  offset?: number;
  limit?: number;
}
interface AssetListParams extends ListParam {
  owner?: string;
  orderDirection?: 'asc' | 'desc';
}
interface EventListParams extends ListParam {
  assetContractAddress?: string;
  onlyOpensea?: string;
}
interface CollectionListParams extends ListParam {
  assetOwner? : string;
}


@Injectable({providedIn: 'root'})
export class OpenSea {

  /**
  * allow to get asset of a specific wallet adress
  * @param params
  * @returns json object
  **/  
  getAssets(params : AssetListParams = {}) {    
    return getList('assets', params);   
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
   * @param params 
   * @returns json object
   */
  getEvents(params: EventListParams = {}) {
    return getList('events', params);
  }

  /**
   * allow to get more information about an contract asset
   * @param address 
   * @returns json object
   */
  getAssetContract(address: string) {
    return get(`asset_contract/${address}`);
  }

  /**
   * allow to get the collections of a wallet adress
   * @param params 
   * @returns json object
   */
  getCollections(params: CollectionListParams = {}) {
    return getList('collections', params);
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
   * @param params 
   * @returns json object
   */
  getBundles(params: ListParam = {}) {
    return getList('bundles', params)
  }
}