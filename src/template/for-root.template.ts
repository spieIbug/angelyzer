import { AngularModule } from '../model/angular-module.model';

export const forRootRecommandationTemplate = (module: AngularModule) => (
  `<p>The module ${module.name} has exports ${JSON.stringify(module.exports)} and providers ${JSON.stringify(module.providers)}</p>
   <p>You should have a :</p>
   <code>
      <pre>static forRoot(): ModuleWithProviders {
        return {
          ngModule: ${module.name},
          providers: ${JSON.stringify(module.providers).replace(/"/g, '')}
        };
      }</pre>
    </code>
    <p>Or define a CoreModule that only provide ${JSON.stringify(module.providers)}</p>
    <p>Becarefull : the forRoot is for AppModule not children.</p>
    <a href="https://angular.io/guide/singleton-services">@see</a> & <a href="https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-a-shared-module-provides-a-service-to-a-lazy-loaded-module">@see</a>`
);