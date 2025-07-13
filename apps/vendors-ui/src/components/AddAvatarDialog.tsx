'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { uploadSingleImage } from '@/services/uploads.services';
import toast from 'react-hot-toast';
import { IImage } from '@/types';

export const AddAvatarDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  oldAvatarUrl: string | null;
  callback: (image: IImage) => void;
}> = ({ open, onOpenChange, title, description, oldAvatarUrl = null, callback }) => {
  const [avatar, setAvatar] = React.useState<File | null>(null);

  function handleSelectAvatar() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  }

  function handleCancel() {
    setAvatar(null);
    onOpenChange(false);
  }

  const { mutateAsync: onUploadAvatar } = useMutation({
    mutationKey: ['Upload', 'image'],
    mutationFn: uploadSingleImage,
    onSuccess: data => {
      callback(data.data.imageData);
    },
    onSettled: () => {
      setAvatar(null);
      onOpenChange(false);
    },
  });

  function handleUploadAvatar() {
    if (!avatar) {
      toast.error('Please select an avatar');
      return;
    }

    const formData = new FormData();
    formData.append('file', avatar);

    toast.promise(onUploadAvatar(formData), {
      loading: 'Uploading avatar...',
      success: 'Avatar uploaded successfully',
      error: 'Error uploading avatar',
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-4">
          {oldAvatarUrl ? (
            <Image
              src={oldAvatarUrl}
              alt="Avatar"
              width={600}
              height={600}
              className="w-full aspect-video object-cover rounded-md"
            />
          ) : null}

          <div className="space-y-4">
            {avatar ? (
              <div className="mt-4 space-y-4">
                <Image
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  width={600}
                  height={600}
                  className="w-full aspect-video object-cover rounded-md"
                />

                <div className="flex justify-end gap-4">
                  <Button onClick={handleUploadAvatar}>
                    <span>{oldAvatarUrl ? 'Change Avatar' : 'Add Avatar'}</span>
                  </Button>

                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <Input
                  type="file"
                  id="file-input"
                  multiple
                  max={1}
                  onChange={e => {
                    const files = e.target.files;
                    if (files) {
                      setAvatar(files[0]);
                    }
                  }}
                  accept="image/*"
                  hidden
                  required
                />

                <Button onClick={handleSelectAvatar}>Select Avatar</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
