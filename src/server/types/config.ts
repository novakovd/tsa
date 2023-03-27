export interface ConfigPropsAware {
  readonly appHostname: string;
  readonly appPort: number;
  readonly appProto: string;
  readonly maxTextLength: number;
}

export class Config implements ConfigPropsAware {
  readonly appHostname: string;
  readonly appPort: number;
  readonly appProto: string;
  readonly databaseUrl: string;
  readonly maxTextLength: number;
  readonly appUrl: string;
  readonly viewsPath: string;

  constructor(props: ConfigPropsAware) {
    this.appHostname = props.appHostname;
    this.appPort = props.appPort;
    this.appProto = props.appProto;
    this.maxTextLength = props.maxTextLength;

    const port = this.appPort === 80 ? "" : `:${this.appPort}`;

    this.appUrl = `${this.appProto}://${this.appHostname}${port}`;
    this.viewsPath = "./src/server/views";
    this.databaseUrl = "file:../data/prod.db";
  }
}
