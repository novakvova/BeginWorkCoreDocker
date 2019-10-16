import React, {Component} from 'react';
import './index.scss';

class EclipseWidgetContainer extends Component {
    render() {
        return (
            <div className="my_eclipse" id="dlgProgress">
                <div className="progress">
                    <div>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}
const EclipseWidget = (EclipseWidgetContainer);
export default EclipseWidget;