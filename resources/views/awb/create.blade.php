<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add a package') }}
        </h2>
    </x-slot>

    <main>
        <div class="bg-white py-6 sm:py-6 border border-b">
            <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div class="max-w-2xl">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add AWB</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600">Here you can add a package that you want to
                        track</p>
                </div>
                <form action="/awb/store" class="col-span-2" method="post">
                    @csrf
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12">

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div class="sm:col-span-3">
                                    <label for="awb_number" class="block text-sm font-medium leading-6 text-gray-900">AWB
                                        Number</label>
                                    <div class="mt-2">
                                        <input id="awb_number" name="awb_number" type="text" autocomplete="awb_number"
                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                               required>
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="carrier" class="block text-sm font-medium leading-6 text-gray-900">Carrier</label>
                                    <div class="mt-2">
                                        <select id="carrier" name="carrier" autocomplete="carrier"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            @foreach($carriers as $carrier)
                                                <option value="{{ $carrier->id }}">{{ $carrier->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="sm:col-span-3 sm:col-start-1">
                                    <label for="tag" class="block text-sm font-medium leading-6 text-gray-900">Tag
                                        (package name)</label>
                                    <div class="mt-2">
                                        <input type="text" name="tag" id="tag" autocomplete="tag"
                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                               required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit"
                                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </main>
</x-app-layout>
