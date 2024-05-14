<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add a package') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg col-span-3">
                <form action="/awb/store" class="col-span-2" method="post">
                    <header>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Add AWB
                        </h2>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Here you can add a package that you want to
                            track
                        </p>
                    </header>
                    @csrf
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12">

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div class="sm:col-span-3">
                                    <label for="awb_number" class="block text-sm font-medium leading-6 dark:text-white">AWB
                                        Number</label>
                                    <div class="mt-2">
                                        <input id="awb_number" name="awb_number" type="text" autocomplete="awb_number"
                                               class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                               required>
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="carrier" class="block text-sm font-medium leading-6 dark:text-white">Carrier</label>
                                    <div class="mt-2">
                                        <select id="carrier" name="carrier" autocomplete="carrier"
                                                class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-full sm:text-sm sm:leading-6">
                                            @foreach($carriers as $carrier)
                                                <option value="{{ $carrier->id }}">{{ $carrier->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="sm:col-span-3 sm:col-start-1">
                                    <label for="tag" class="block text-sm font-medium leading-6 dark:text-white">Tag
                                        (package name)</label>
                                    <div class="mt-2">
                                        <input type="text" name="tag" id="tag" autocomplete="tag"
                                               class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                               required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <header class="mt-5">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Notification settings
                        </h2>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Choose how you want to be notified, by mail or discord. If you don't want any notifications you can leave the fields below empty.
                        </p>
                    </header>

                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-3">

                            <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div class="sm:col-span-6">
                                    <label for="notifications_mail_address" class="block text-sm font-medium leading-6 dark:text-white">E-mail address (optional)</label>
                                    <div class="mt-2">
                                        <input id="notifications_mail_address" name="notifications_mail_address" type="text" autocomplete="notifications_mail_address"
                                               class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                    </div>
                                </div>

                                <div class="sm:col-span-6">
                                    <label for="notifications_discord_webhook" class="block text-sm font-medium leading-6 dark:text-white">Discord webhook URL (optional)</label>
                                    <div class="mt-2">
                                        <input type="text" name="notifications_discord_webhook" id="notifications_discord_webhook" autocomplete="notifications_discord_webhook"
                                               class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    @if ($errors->any())
                                @foreach ($errors->all() as $error)
                                    <p class="text-red-500 text-xs mt-1">{{ $error }}</p>
                                @endforeach
                    @endif

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
                        <button type="submit"
                                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
