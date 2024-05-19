import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useRef, useState} from "react";
import {GET_DEVICES, useCreateDevice} from "@/client/device.ts";
import {css} from "@emotion/react";
import {BG_BASE, HOVER, TEXT2} from "@/styles/colors.ts";
import {useApolloClient} from "@apollo/client";
import {useMyInfo} from "@/hooks/common/useMyInfo.ts";
import {DeviceCreation} from "@/graphql/types.ts";

export function DeviceCreateButton() {

  const apollo = useApolloClient();

  const {myInfo} = useMyInfo();
  const {createDevice} = useCreateDevice();

  const ref = useRef<HTMLButtonElement>(null);
  const [nameInput, setNameInput] = useState("");

  const onAddChatRoom = async () => {
    const variables: {creation: DeviceCreation} = {
      creation: { name: nameInput },
    };
    const res = await createDevice({variables});
    const created = res.data?.createDevice;
    console.log(created)
    if (created === undefined) {
      throw Error("created chat room is undefined");
    }
    setNameInput("");
    const myId = myInfo?.id;
    if (myId !== undefined) {
      apollo.refetchQueries({ include: [GET_DEVICES(myId)] });
    }
    ref?.current?.click();
  }

  return (
    <Dialog onOpenChange={() => true}>
      <DialogTrigger asChild>
        <div className="rounded-sm px-1 py-2" css={css`
          margin: 0.2rem;
          color: ${TEXT2};
          font-weight: 500;
          font-size: 1.1rem;
          cursor: pointer;
          &:hover {
            background: ${HOVER};
          }
        `}>
          <button>기기 추가</button>
        </div>
      </DialogTrigger>
      <DialogClose ref={ref}></DialogClose>
      <DialogContent className="sm:max-w-[425px]" css={{background: BG_BASE}}>
        <DialogHeader>
          <DialogTitle>기기 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={e => setNameInput(e.target.value)}
              value={nameInput}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onAddChatRoom()}>등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
