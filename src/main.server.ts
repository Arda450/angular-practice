import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/web/app';
import { config } from './app/web/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
