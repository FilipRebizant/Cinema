<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HallController extends Controller
{
    /**
     * @Route("/hall", name="hall")
     */
    public function index()
    {
        return $this->render('hall/index.html.twig', [
            'controller_name' => 'HallController',
        ]);
    }
}
