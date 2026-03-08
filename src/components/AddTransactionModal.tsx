"use client";

import React from "react";
import { Modal } from "./Modal";
import { TransactionForm } from "./TransactionForm";
import type { AddTransactionModalProps } from "../types/components";

/** Modal wrapper for creating a new transaction. */
export function AddTransactionModal({
  open,
  onClose,
  onSave,
  initialData,
}: AddTransactionModalProps) {
  return (
    <Modal
      open={open}
      title={initialData ? "Edit Transaction" : "Add New Transaction"}
      onClose={onClose}
      footer={
        <div className="text-xs text-slate-500">
          Fields marked with * are required.
        </div>
      }
    >
      <TransactionForm
        variant="modal"
        onSave={onSave}
        initialData={initialData}
        onCancel={onClose}
        onSubmitted={onClose}
        submitLabel={initialData ? "Update" : "Save"}
      />
    </Modal>
  );
}

export default AddTransactionModal;


