import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openSea-Angular';

  async connect() {
    const provider = (window as any).ethereum;
    if (!provider) alert ('Create your Metamask account!');
    await provider.request({method: 'eth_requestAccounts'}); 
  }
}
