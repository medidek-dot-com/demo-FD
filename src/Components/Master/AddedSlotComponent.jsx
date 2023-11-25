import React, { useState } from "react";
import EditSlotSettingComponent from "./EditSlotSettingComponent";
import ShowAddedSlotComponent from "./ShowAddedSlotComponent";

const AddedSlotComponent = ({
    onlineSlotData,
    getOnlineSlotDetailForDoctorForPerticularDate,
    selectedSlotDate,
}) => {
    const [editSlotSetting, setEditSlotSetting] = useState(false);

    return (
        <>
            {editSlotSetting ? (
                <EditSlotSettingComponent
                    setEditSlotSetting={setEditSlotSetting}
                    getOnlineSlotDetailForDoctorForPerticularDate={
                        getOnlineSlotDetailForDoctorForPerticularDate
                    }
                    selectedSlotDate={selectedSlotDate}
                    onlineSlotData={onlineSlotData}
                />
            ) : (
                <ShowAddedSlotComponent
                    onlineSlotData={onlineSlotData}
                    setEditSlotSetting={setEditSlotSetting}
                />
            )}
        </>
    );
};

export default AddedSlotComponent;
