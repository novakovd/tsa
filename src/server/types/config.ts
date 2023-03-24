interface ConfigPropsAware {
  readonly appHostname: string;
  readonly appPort: string;
  readonly appProto: string;
  readonly databaseUrl: string;
}

export class Config implements ConfigPropsAware {
  readonly appHostname: string;
  readonly appPort: string;
  readonly appProto: string;
  readonly databaseUrl: string;
  readonly appUrl: string;
  readonly viewsPath: string;

  constructor(props: ConfigPropsAware) {
    this.appHostname = props.appHostname;
    this.appPort = props.appPort;
    this.appProto = props.appProto;
    this.databaseUrl = props.databaseUrl;

    const port = this.appPort === "80" ? "" : `:${this.appPort}`;

    this.appUrl = `${this.appProto}://${this.appHostname}${port}`;
    this.viewsPath = "./src/server/views";
  }
}
