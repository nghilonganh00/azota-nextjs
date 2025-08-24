"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AccountSettingTabs } from "./utils/constant";
import TabList from "./components/TabList";
import TabPanels from "./components/TabPanels";

const AccountSetting = () => {
  const searchParams = useSearchParams();
  const tabId = searchParams.get("tabId");

  const [selectedTab, setSelectedTab] = useState<string>(AccountSettingTabs.GENERAL);

  useEffect(() => {
    switch (Number(tabId)) {
      case 0:
        setSelectedTab(AccountSettingTabs.GENERAL);
        break;
      case 1:
        setSelectedTab(AccountSettingTabs.CHANGE_PASSWORD);
        break;
      case 2:
        setSelectedTab(AccountSettingTabs.UNIT);
        break;
      case 3:
        setSelectedTab(AccountSettingTabs.TRANSACTION_HISTORY);
        break;
      case 4:
        setSelectedTab(AccountSettingTabs.WIDTHDRAW_HISTORY);
        break;
      default:
        setSelectedTab(AccountSettingTabs.GENERAL);
        break;
    }
  }, [tabId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="px-4 py-5 dark:text-slate-300">
        <div className="mb-6 text-lg font-semibold">Cài đặt tài khoản</div>
        <div className="grid grid-cols-12 gap-4">
          <TabList selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          <TabPanels selectedTab={selectedTab} />
        </div>
      </div>
    </Suspense>
  );
};

export default AccountSetting;
