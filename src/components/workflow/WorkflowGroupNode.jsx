import { memo } from 'react';
import { ChevronDown, ChevronRight, Folders } from 'lucide-react';

const WorkflowGroupNode = ({ data }) => {
  const { id, label, collapsed, onToggleCollapse } = data;

  return (
    <div className="workflow-group-node">
      {/* Folder Tab Header */}
      <div className="workflow-group-tab">
        <div className="workflow-group-tab-content">
          <Folders size={14} className="workflow-group-icon" />
          <span className="workflow-group-title">{label || 'Group'}</span>
        </div>
        <button 
          className="workflow-group-toggle"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleCollapse) onToggleCollapse(id);
          }}
          title={collapsed ? "Expand Group" : "Collapse Group"}
          data-cursor-hover
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {/* Body for collapsed state */}
      <div className="workflow-group-body">
        {collapsed && (
          <div className="workflow-group-collapsed-text">
            {label || 'Group'} (Collapsed)
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(WorkflowGroupNode);
