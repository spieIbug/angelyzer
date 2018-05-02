import {AngularModule} from '../model/angular-module.model';

export const forRootRecommandationTemplate = (module: AngularModule) => (
    `The module ${module.name} has exports <code><pre>${JSON.stringify(module.exports, null, 2)}</pre></code>and providers<code><pre>${JSON.stringify(module.providers, null, 2)}</pre></code>
   You should have a :
   <code>
      <pre>static forRoot(): ModuleWithProviders {
    return {
      ngModule: ${module.name},
      providers: ${JSON.stringify(module.providers, null, 8).replace(/"/g, '')}
    };
  }</pre>
    </code>Or define a CoreModule that only provide <br/>${JSON.stringify(module.providers, null, 2)}<br/>
    Becarefull : the forRoot is for AppModule not children.<br/>
    <a href="https://angular.io/guide/singleton-services">@see</a> & <a href="https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-a-shared-module-provides-a-service-to-a-lazy-loaded-module">@see</a>`
);