import * as React from 'react';
import styles from './Growthmapping.module.scss';
import { IGrowthmappingProps } from './IGrowthmappingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DepartmentPivot from './DepartmentPivot';
import {sp} from "@pnp/sp/presets/all";
import {graph} from "@pnp/graph/presets/all";
export default class Growthmapping extends React.Component<IGrowthmappingProps, {}> {
  constructor(prop: IGrowthmappingProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
    graph.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IGrowthmappingProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div><DepartmentPivot/></div>
    );
  }
}
