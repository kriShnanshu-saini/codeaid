import { Permission } from 'node-appwrite';
import { questionAttachmentBucket } from '@/models/name';
import { storage } from '@/models/server/config';

export default async function getOrCreateStorage() {
	try {
		await storage.getBucket(questionAttachmentBucket);
		console.log('🟢 Storage connected ✓');
	} catch (err) {
		try {
			await storage.createBucket(
				questionAttachmentBucket,
				questionAttachmentBucket,
				[
                    Permission.read('any'), 
                    Permission.read('users'), 
                    Permission.create('users'), 
                    Permission.update('users'), 
                    Permission.delete('users')
                ],
				false,
				undefined,
				undefined,
				['jpg', 'png', 'gif', 'jpeg', 'webp', 'heic']
			);
            console.log('🟢 Storage connected ✓');
		} catch (err) {
            console.log("🚀 Error creating storage:", err)
        }
	}
}
