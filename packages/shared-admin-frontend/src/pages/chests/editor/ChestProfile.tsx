import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ImageInputValue } from "@client/comps/input/ImageInput";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Strings } from "@core/services/strings";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Chests } from "#app/services/chests";

export const ChestProfile = ({
  image,
  imageError,
  displayName,
  displayNameError,
  kind,
  items,
  chest,
  estimatedValue,
  openCost,
  totalDropRate,
  setImage,
  setDisplayName,
  setKind,
}: {
  image: ImageInputValue | undefined;
  imageError: string | undefined;
  displayName: string | undefined;
  displayNameError: string | undefined;
  kind: ChestKind;
  items: ChestItem[];
  chest: ChestDocument | undefined;
  estimatedValue: number;
  openCost: number;
  totalDropRate: number;
  setImage: (x: ImageInputValue | undefined) => void;
  setDisplayName: (x: string | undefined) => void;
  setKind: (x: ChestKind) => void;
}) => {
  const totalDropDecimal = Intimal.toDecimal(totalDropRate, 6);
  const placehold = items.length === 0 || openCost === 0;

  return (
    <Div
      fx
      px={32}
      py={24}
      gap={32}
      bg="brown-6"
      border
    >
      <Input
        type="image"
        accept=".png"
        width="256px"
        height="256px"
        placeholder={{
          type: "png",
          path: chest ? `/chests/${chest.imageId}` : "/graphics/unknown-icon",
        }}
        value={image}
        error={imageError}
        onChange={setImage}
      />
      <Div
        column
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Display Name"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter display name..."
            value={displayName}
            error={displayNameError}
            onChange={setDisplayName}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Total EV"}</ModalLabel>
          <ModalField>
            <Tokens
              value={estimatedValue}
              decimals={6}
            />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Cost to Open"}</ModalLabel>
          <ModalField>
            <Tokens
              value={openCost}
              decimals={6}
            />
          </ModalField>
        </ModalSection>
      </Div>
      <Div
        column
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Kind"}</ModalLabel>
          <Dropdown
            type="select"
            options={Chests.kinds.map((x) => Strings.kebabToTitle(x))}
            value={Chests.kinds.indexOf(kind)}
            onChange={(x, i) => setKind(Chests.kinds[i])}
          />
        </ModalSection>
        <Div
          fx
          gap={16}
        >
          <ModalSection>
            <ModalLabel>{"Min Multiplier"}</ModalLabel>
            <ModalField color="gray">
              {placehold
                ? "0"
                : Numbers.floor(
                    items[items.length - 1].lootValue / openCost,
                    4,
                  )}
              {"x"}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Max Multiplier"}</ModalLabel>
            <ModalField color="gray">
              {placehold
                ? "0"
                : Numbers.floor(items[0].lootValue / openCost, 1)}
              {"x"}
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={16}
        >
          <ModalSection>
            <ModalLabel>{"Item Count"}</ModalLabel>
            <ModalField color="gray">{items.length}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Total Chance"}</ModalLabel>
            <ModalField color={totalDropDecimal !== 1 ? "red" : "green"}>
              {(totalDropDecimal * 100).toFixed(4) + "%"}
            </ModalField>
          </ModalSection>
        </Div>
      </Div>
    </Div>
  );
};
