import React from "react";
import { Link } from "react-router";

const FolderListItem = props => {
	return (
		<div className="col-12">
			<div className="material margin-top-small">
				<Link className="tile-link" to={`/folders/${props.id}`}>
					<div className="folder-body">
						<span className="folder-title">{props.topic}</span>
					</div>
				</Link>
				<div className="folder-footer text-right">
					<i className="fas fa-pencil-alt" />
					<i className="fas fa-trash-alt" onClick={props.handleDelete} />
				</div>
			</div>
		</div>
	);
};

export default FolderListItem;