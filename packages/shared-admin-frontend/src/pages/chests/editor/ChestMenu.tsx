import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { ChestAction } from "./ChestAction";

export const ChestMenu = ({
  action,
  disabled,
  isLoading,
  onCancelClick,
  onBackClick,
  onImportClick,
  onExportClick,
  onDisableClick,
  onEnableClick,
  onUpdateClick,
  onCreateClick,
}: {
  action: ChestAction;
  disabled: boolean;
  isLoading: boolean;
  onCancelClick: () => void;
  onBackClick: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
  onDisableClick: () => void;
  onEnableClick: () => void;
  onUpdateClick: () => void;
  onCreateClick: () => void;
}) => {
  return (
    <Div
      fx
      center
      gap={16}
    >
      {action === "create" && (
        <Fragment>
          <Button
            kind="secondary"
            icon={SvgCaretLeft}
            label="Cancel"
            disabled={isLoading}
            onClick={onCancelClick}
          />
          <Div grow />
          <Button
            kind="secondary"
            label="Import Chest"
            disabled={isLoading}
            onClick={onImportClick}
          />
          <Button
            kind="secondary"
            label="Export Chest"
            disabled={isLoading}
            onClick={onExportClick}
          />
          <Button
            kind="primary"
            disabled={isLoading}
            label="Create Chest"
            onClick={onCreateClick}
          />
        </Fragment>
      )}
      {action === "edit" && (
        <Fragment>
          <Button
            kind="secondary"
            icon={SvgCaretLeft}
            label="Back to Cases"
            disabled={isLoading}
            onClick={onBackClick}
          />
          <Div grow />
          <Button
            kind="secondary"
            label="Export Chest"
            disabled={isLoading}
            onClick={onExportClick}
          />
          <Button
            kind="secondary"
            label={disabled ? "Enable Chest" : "Disable Chest"}
            disabled={isLoading}
            onClick={disabled ? onEnableClick : onDisableClick}
          />
          <Button
            width={128}
            kind="primary"
            disabled={isLoading}
            label="Update Chest"
            onClick={onUpdateClick}
          />
        </Fragment>
      )}
    </Div>
  );
};
