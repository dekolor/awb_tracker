<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Package: ' . $awb->tag) }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("Some info about AWB #" . $awb->awb_number) }}
                    <ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        @foreach($awb->steps->sortByDesc('status_date') as $awbstep)
                            <li class="py-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {{ $awbstep->status_long }}
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {{ $awbstep->status_date }}
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {{ $awbstep->county }}
                                            @empty(!$awbstep->country)
                                                ({{ $awbstep->country }})
                                            @endempty

                                            @empty(!$awbstep->transit_location)
                                                -> {{ $awbstep->transit_location }}
                                            @endempty
                                        </p>
                                    </div>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
